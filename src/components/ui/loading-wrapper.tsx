import type { PropsWithChildren } from "react";

interface LoadingWrapperProps extends PropsWithChildren {
  isLoading: boolean;
}

export const LoadingWrapper = ({ isLoading, children }: LoadingWrapperProps) => {
  return isLoading
    ? (
      <div className="flex justify-center items-center h-full w-full p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>)
    : children;
};
