export async function fetchGitHubRepos(username: string) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                },
                next: { revalidate: 3600 }, // Revalidate every hour
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub repositories');
        }

        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}
