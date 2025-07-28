export class EnvironmentConfig {
  private static baseURLs: Record<'sit' | 'qa' | 'uat', string> = {
    sit: 'https://sit.example.com',
    qa: 'https://auth.synchronybank.com/account/login',
    uat: 'https://uat.example.com',
  };

  public static getBaseURL(env: 'sit' | 'qa' | 'uat'): string {
    const baseURL = this.baseURLs[env];
    if (!baseURL) {
      throw new Error(`[ERROR]: Invalid environment specified: ${env}`);
    }
    return baseURL;
  }
}
