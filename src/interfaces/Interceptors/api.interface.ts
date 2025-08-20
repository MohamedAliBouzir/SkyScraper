export interface IServerStatus {
  status: boolean;
  message: string;
}

export interface IUseTestServerReturn {
  data: IServerStatus | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isError: boolean;
  refetch: () => void;
}
