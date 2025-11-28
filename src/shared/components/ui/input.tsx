import * as React from "react";
import { cn } from "../../utils/shadcn";

export interface InputProps extends React.ComponentProps<"input"> {
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  error?: string;
  isErrorVisible?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      helperText,
      icon,
      iconPosition = "left",
      error = "",
      isErrorVisible = true,
      ...props
    },
    ref
  ) => {
    const inputElement = (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:border-destructive",
          error && "border-destructive",
          icon && iconPosition === "left" ? "pl-9" : "px-3",
          icon && iconPosition === "right" ? "pr-9" : "px-3",
          className
        )}
        {...props}
      />
    );

    if (!icon && !helperText && !error) {
      return inputElement;
    }

    return (
      <div className="w-full">
        {icon ? (
          <div className="relative">
            {iconPosition === "left" && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                {icon}
              </div>
            )}
            {inputElement}
            {iconPosition === "right" && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                {icon}
              </div>
            )}
          </div>
        ) : (
          inputElement
        )}
        {helperText && (
          <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
        )}

        {error && isErrorVisible && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
