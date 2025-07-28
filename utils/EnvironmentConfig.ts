export class EnvironmentConfig {
  private static baseURLs = {
    sit: 'https://sit.example.com',
    qa: 'https://qa.example.com',
    uat: 'https://uat.example.com',
  };

  public static getBaseURL(env: string): string {
    const baseURL = this.baseURLs[env];
    if (!baseURL) {
      throw new Error(`[ERROR]: Invalid environment specified: ${env}`);
    }
    return baseURL;
  }
}
