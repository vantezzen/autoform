"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";

function AlertBanner() {
  return (
    <Alert
      variant="destructive"
      className="border-amber-200 bg-amber-50/80 dark:border-amber-800/50 dark:bg-amber-950/30 backdrop-blur-sm shadow-lg dark:shadow-amber-900/20 transition-colors duration-200"
    >
      <AlertDescription className="flex items-start space-x-3">
        <div className="text-xl">🚧</div>
        <div className="text-amber-800 dark:text-amber-200 leading-relaxed">
          <span className="font-bold text-amber-900 dark:text-amber-100 text-base">
            Work in Progress{" "}
          </span>
          AutoForm as a standalone package is still work in progress. If you
          want to help out, please check out the{" "}
          <a
            href="https://github.com/vantezzen/auto-form"
            className="text-blue-600 hover:text-blue-800 decoration-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>{" "}
          and add your own integrations!
        </div>
      </AlertDescription>
    </Alert>
  );
}

export default AlertBanner;
