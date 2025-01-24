const base_url = "https://agent-be.kinza.finance";

export function addAccount(username: string): Promise<{
  data: object;
  error: string | null;
}> {
  return fetch(new URL("users/add", base_url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  }).then((res) => res.json());
}
