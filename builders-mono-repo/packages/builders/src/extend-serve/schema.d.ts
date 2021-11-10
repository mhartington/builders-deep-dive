export interface ExtendDevServer {
  devServerTarget: string;
  port: number;
  host: string;
  ssl: boolean;
  sourceMap?: boolean;
  consolelogs?: boolean;
  consolelogsPort?: number;
}
