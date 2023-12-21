export type RetainCancellationFlowStatus = 'error' | 'aborted' | 'chose_to_cancel' | 'retained';

export type RETAIN_DEMO_FEATURE =
  | 'paymentRecovery'
  | 'paymentRecoveryInApp'
  | 'termOptimization'
  | 'termOptimizationInApp'
  | 'cancellationFlow';

type RetainCancellationFlowNotShownStatus = 'error';

export interface RetainCancellationFlowNotShownResult {
  status: RetainCancellationFlowNotShownStatus;
  details: string;
}

export interface RetainCancellationFlowShownResult {
  status: Exclude<RetainCancellationFlowStatus, RetainCancellationFlowNotShownStatus>;
  salvageAttemptResult: RetainCancellationFlowSalvageAttemptResult | null;
  salvageOfferResult: RetainCancellationFlowSalvageOfferResult | null;
  additionalFeedback: string | null;
  cancelReason: string | null;
  satisfactionInsight: string | null;
  salvageAttemptIntended: RetainCancellationFlowSalvageAttempt | null;
  salvageAttemptUsed: RetainCancellationFlowSalvageAttempt | null;
}

export type RetainCancellationFlowResult = RetainCancellationFlowShownResult | RetainCancellationFlowNotShownResult;

export type RetainCancellationFlowSalvageAttemptResolution = 'accepted' | 'rejected';

export type RetainCancellationFlowSalvageOfferDecision = 'accepted' | 'rejected';

export interface RetainCancellationFlowSalvageAttemptResult {
  decision: RetainCancellationFlowSalvageAttemptResolution;
  resolution: RetainCancellationFlowSalvageAttemptResolution;
  hasErrors: boolean;
}

export interface RetainCancellationFlowSalvageOfferResult {
  decision: RetainCancellationFlowSalvageOfferDecision;
  hasErrors: boolean;
}

type RetainCancellationFlowSalvageAttempt =
  | 'pause_subscription'
  | 'plan_switch'
  | 'contact_support_email_notification'
  | 'contact_support_meeting_scheduler';

export interface RetainDemoAttributeProps {
  feature: RETAIN_DEMO_FEATURE;
}

export interface RetainCancellationFlowAttributeProps {
  subscriptionId: string;
}
