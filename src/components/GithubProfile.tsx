import { useState } from "react";

interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export default function GithubProfile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchGithubUser = async () => {
    if (!username) return;
    setLoading(true);
    setUser(null);
    setError("");

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUser(data);
      setUsername("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section className="h-screen overflow-hidden flex flex-col bg-gray-900">
        <div className="flex p-2">
      <img src="/favicon.svg" alt="DevPeek Logo" className="w-10 h-10 md:w-12 md:h-12 mt-2" />
      <header className="bg-gray-900 p-4">
        <h1 className="text-2xl text-white heading">DevPeek</h1>
      </header>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white md:m-3 mx-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="p-2 rounded text-white w-full max-w-xs border-2 border-blue-500"
            onKeyPress={(e) => e.key === "Enter" && fetchGithubUser()}
          />
          <button
            onClick={fetchGithubUser}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:scale-105 transform transition-all"
          >
            Submit
          </button>
        </div>

        {loading && (
          <div className="mt-4 border-4 border-white border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
        )}

        <div className="mt-6 flex flex-col items-center w-full max-w-md overflow-y-auto">
          {error && (
            <div className="bg-red-600 text-white p-3 rounded w-full text-center">
              {error}
            </div>
          )}

          {user && (
            <div className="flex flex-col items-center bg-gray-800 p-4 rounded w-full space-y-3">
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-32 h-32 rounded border-2 border-white"
              />
              <h2 className="text-xl font-bold">{user.name || "No Name"}</h2>
              <p>{user.bio || "No bio available"}</p>
              <p>Followers: {user.followers} | Following: {user.following}</p>
              <p>Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 hover:scale-105 transform transition-all"
              >
                View Full Profile
              </a>
              <img
                src={`https://ghchart.rshah.org/${user.login}`}
                alt="Contribution Chart"
                className="mt-2 w-full rounded bg-white p-2"
              />
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
