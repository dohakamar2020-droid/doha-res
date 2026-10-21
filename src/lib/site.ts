export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && env.trim()) {
    return env.trim().replace(/\/$/, "");
  }
  return "http://localhost:3000";
}
