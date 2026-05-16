/**
 * useInterstitialAd
 *
 * Manages ONE interstitial ad instance for a specific ad unit ID.
 * Multiple instances share a global session counter and cooldown timer
 * so the combined frequency across all triggers stays within policy.
 *
 * Guards:
 *  - 2-minute cooldown between any interstitial show (shared across all instances)
 *  - Max 3 interstitial shows per app session (shared across all instances)
 *  - AdMob frequency cap as a secondary backup
 *
 * Policy notes:
 *  - Ads are only shown at natural task-completion / context-switch moments
 *  - Never shown mid-task or on back-press from a form
 *  - `onAfter` callback always fires — navigation is never blocked by an ad
 */

import { useCallback, useEffect, useRef } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// ── Shared session state (module-level, survives re-renders) ─────────────────
const COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes
const MAX_ADS_PER_SESSION = 3;

let _lastShownAt = 0;
let _sessionCount = 0;

function canShowGlobal(): boolean {
  if (_sessionCount >= MAX_ADS_PER_SESSION) { return false; }
  if (Date.now() - _lastShownAt < COOLDOWN_MS) { return false; }
  return true;
}

function recordShown(): void {
  _lastShownAt = Date.now();
  _sessionCount += 1;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

interface UseInterstitialAdOptions {
  /** Production ad unit ID. TestIds.INTERSTITIAL is used automatically in dev. */
  adUnitId: string;
}

export function useInterstitialAd({ adUnitId }: UseInterstitialAdOptions) {
  const resolvedUnitId = __DEV__ ? TestIds.INTERSTITIAL : adUnitId;

  const adRef = useRef<InterstitialAd | null>(null);
  const isLoadedRef = useRef(false);

  // ── Load a fresh ad ────────────────────────────────────────────────────
  const loadAd = useCallback(() => {
    const ad = InterstitialAd.createForAdRequest(resolvedUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    const unsubscribeLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      isLoadedRef.current = true;
    });

    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      isLoadedRef.current = false;
      unsubscribeLoaded();
      unsubscribeClosed();
      // Pre-load the next ad so it's ready for the next trigger
      loadAd();
    });

    const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, () => {
      isLoadedRef.current = false;
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
      // Retry after 30 s on error
      setTimeout(loadAd, 30_000);
    });

    adRef.current = ad;
    ad.load();
  }, [resolvedUnitId]);

  // Load on mount
  useEffect(() => {
    loadAd();
    // Listeners are cleaned up inside CLOSED / ERROR handlers
  }, [loadAd]);

  /**
   * showAd(onAfter)
   *
   * Attempts to show the interstitial. `onAfter` is always called — either
   * after the ad closes, or immediately if the ad cannot be shown.
   * This ensures navigation is never blocked.
   */
  const showAd = useCallback(
    (onAfter: () => void) => {
      if (!isLoadedRef.current || !adRef.current || !canShowGlobal()) {
        onAfter();
        return;
      }

      // Record before showing to prevent rapid double-triggers
      recordShown();

      const unsubscribe = adRef.current.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          unsubscribe();
          onAfter();
        },
      );

      adRef.current.show();
    },
    [],
  );

  return { showAd };
}
