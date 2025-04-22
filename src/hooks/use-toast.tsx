
import * as React from "react";
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

// Permanent toasts (won't auto-remove)
const TOAST_LIMIT = 1;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type ActionType =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: ToasterToast["id"] }
  | { type: "REMOVE_TOAST"; toastId?: ToasterToast["id"] };

interface State {
  toasts: ToasterToast[];
}

function genId() {
  return Math.random().toString(36).substring(2, 10);
}

const ToastContext = React.createContext<{
  toasts: ToasterToast[];
  toast: (toast: Omit<ToasterToast, "id">) => { id: string; update: (toast: ToasterToast) => void };
  dismiss: (toastId?: string) => void;
}>({
  toasts: [],
  toast: () => ({ id: "", update: () => {} }),
  dismiss: () => {},
});

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE_TOAST":
      return {
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      return {
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      };
    }
    case "REMOVE_TOAST": {
      if (action.toastId === undefined) {
        return { toasts: [] };
      }
      return {
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }
    default:
      return state;
  }
}

export function ToastProviderInternal({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] });

  // Expose API for child components
  const toast = React.useCallback(
    (props: Omit<ToasterToast, "id">) => {
      const id = genId();
      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          open: true,
        },
      });
      const update = (next: ToasterToast) =>
        dispatch({ type: "UPDATE_TOAST", toast: { ...next, id } });
      return { id, update };
    },
    []
  );

  // Remove toast
  const dismiss = React.useCallback(
    (toastId?: string) => {
      dispatch({ type: "DISMISS_TOAST", toastId });
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

// Hook to access toast state
export function useToast() {
  const context = React.useContext(ToastContext);
  return context;
}

// For compatibility with existing code
export const toast = (...args: Parameters<ReturnType<typeof useToast>["toast"]>) =>
  useToast().toast(...args);
