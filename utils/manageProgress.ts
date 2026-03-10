import { gsap } from "gsap";

/**
 * スクロール進行度に基づいてアニメーション進行度を計算する
 * @param progress スクロール進行度 (0-1)
 * @param start アニメーション開始位置 (0-1)
 * @param end アニメーション終了位置 (0-1)
 * @returns アニメーション進行度 (0-1)
 */
export const calculateAnimationProgress = (
  progress: number,
  start: number,
  end: number
): number => {
  return gsap.utils.clamp(
    0,
    1,
    gsap.utils.mapRange(start, end, 0, 1, progress)
  );
};

/**
 * スクロール進行度に基づいてフェードイン・フェードアウトを計算する。0→1→0
 * @param progress スクロール進行度 (0-1)
 * @param fadeInStart フェードイン開始位置
 * @param fadeInEnd フェードイン終了位置
 * @param fadeOutStart フェードアウト開始位置
 * @param fadeOutEnd フェードアウト終了位置
 * @returns アニメーション進行度 (0-1)
 */
export const calculateFadeProgress = (
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
): number => {
  if (progress < fadeInStart || progress > fadeOutEnd) return 0;
  if (progress < fadeInEnd) {
    // フェードイン
    return gsap.utils.mapRange(fadeInStart, fadeInEnd, 0, 1, progress);
  } else if (progress > fadeOutStart) {
    // フェードアウト
    return gsap.utils.mapRange(fadeOutStart, fadeOutEnd, 1, 0, progress);
  } else {
    // 表示中
    return 1;
  }
};
