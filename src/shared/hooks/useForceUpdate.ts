/**
 * useForceUpdate
 *
 * Fetches Firebase Remote Config on app launch and determines whether
 * the user must update before continuing.
 *
 * Remote Config keys expected:
 *   android_min_version  — e.g. "1.0.1"  (semver string)
 *   android_force_update — e.g. "true"   (string boolean)
 *
 * Returns:
 *   isLoading       — true while Remote Config is being fetched
 *   forceUpdate     — true when the installed version is below the minimum
 *   currentVersion  — the installed app version (from device-info)
 *   minVersion      — the minimum required version from Remote Config
 */

import { useEffect, useState } from 'react';
import remoteConfig, { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';

// ── Default values used when Remote Config is unreachable ────────────────────
// Set android_force_update to "false" so the app never blocks users offline.
const REMOTE_CONFIG_DEFAULTS = {
  android_min_version: '1.0.0',
  android_force_update: 'false',
  android_whats_new: '[]',
};

/**
 * Compares two semver strings (major.minor.patch).
 * Returns true when `version` is strictly less than `minVersion`.
 * Handles versions with fewer than 3 parts (e.g. "1.0" treated as "1.0.0").
 */
function isVersionBelow(version: string, minVersion: string): boolean {
  const toNumbers = (v: string): [number, number, number] => {
    const parts = v.split('.').map(n => {
      const parsed = parseInt(n, 10);
      return isNaN(parsed) ? 0 : parsed;
    });
    // Pad to 3 parts
    while (parts.length < 3) { parts.push(0); }
    return [parts[0], parts[1], parts[2]];
  };

  const [maj1, min1, pat1] = toNumbers(version);
  const [maj2, min2, pat2] = toNumbers(minVersion);

  if (maj1 !== maj2) { return maj1 < maj2; }
  if (min1 !== min2) { return min1 < min2; }
  return pat1 < pat2;
}

interface ForceUpdateState {
  isLoading: boolean;
  forceUpdate: boolean;
  currentVersion: string;
  minVersion: string;
  whatsNew: string[]; // list of changelog bullet points from Remote Config
}

export function useForceUpdate(): ForceUpdateState {
  const [state, setState] = useState<ForceUpdateState>({
    isLoading: true,
    forceUpdate: false,
    currentVersion: '',
    minVersion: REMOTE_CONFIG_DEFAULTS.android_min_version,
    whatsNew: [],
  });

  useEffect(() => {
    let cancelled = false;

    async function checkForUpdate() {
      try {
        const rc = remoteConfig();

        // 1. Set in-app defaults first — these are used if fetch fails
        await rc.setDefaults(REMOTE_CONFIG_DEFAULTS);

        // 2. Set fetch interval to 0 so every launch gets fresh values
        await rc.setConfigSettings({
          minimumFetchIntervalMillis: 0,
        });

        // 3. Fetch latest values from Firebase (explicit fetch, not fetchAndActivate)
        await rc.fetch(0); // 0 = always fetch fresh, ignore cache
        console.log('[ForceUpdate] fetch() completed');

        // 4. Activate the fetched values so getValue() returns them
        const activated = await rc.activate();
        console.log('[ForceUpdate] activate() result:', activated);

        if (cancelled) { return; }

        // 5. Read values — these now reflect what Firebase served
        const rawForceUpdate = rc.getValue('android_force_update').asString();
        const rawMinVersion  = rc.getValue('android_min_version').asString();
        const rawWhatsNew    = rc.getValue('android_whats_new').asString();
        const currentVersion = DeviceInfo.getVersion();

        console.log('[ForceUpdate] android_force_update =', JSON.stringify(rawForceUpdate));
        console.log('[ForceUpdate] android_min_version  =', JSON.stringify(rawMinVersion));
        console.log('[ForceUpdate] android_whats_new    =', JSON.stringify(rawWhatsNew));
        console.log('[ForceUpdate] currentVersion       =', JSON.stringify(currentVersion));

        // Handle both String ("true") and Boolean ("1") representations
        const forceUpdateEnabled =
          rawForceUpdate.toLowerCase() === 'true' || rawForceUpdate === '1';

        const versionBelow = isVersionBelow(currentVersion, rawMinVersion);

        // Parse whats new — expected format: ["Fix 1", "Fix 2", "New feature"]
        let whatsNew: string[] = [];
        try {
          const parsed = JSON.parse(rawWhatsNew);
          if (Array.isArray(parsed)) {
            whatsNew = parsed.filter(item => typeof item === 'string');
          }
        } catch {
          // Malformed JSON — just show no bullet points
        }

        console.log('[ForceUpdate] forceUpdateEnabled =', forceUpdateEnabled);
        console.log('[ForceUpdate] isVersionBelow     =', versionBelow);
        console.log('[ForceUpdate] shouldForceUpdate  =', forceUpdateEnabled && versionBelow);

        setState({
          isLoading: false,
          forceUpdate: forceUpdateEnabled && versionBelow,
          currentVersion,
          minVersion: rawMinVersion,
          whatsNew,
        });
      } catch (error) {
        // On any error, fail open — never block the user due to a config fetch failure
        console.log('[ForceUpdate] ERROR:', error);
        if (!cancelled) {
          setState(prev => ({ ...prev, isLoading: false, forceUpdate: false, whatsNew: [] }));
        }
      }
    }

    checkForUpdate();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
