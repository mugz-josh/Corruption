import * as React from "react";

export type ToastProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
};

export type ToastActionElement = React.ReactElement;