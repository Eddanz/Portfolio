import React, { useEffect, useState } from 'react';

const apiUrl = 'https://api.github.com/users/eddanz/repos';

const Portfolio = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setRepos(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching data from GitHub API:', error);
                setRepos([]);
                setLoading(false); // Set loading to false on error
            }
        };
        fetchData();
    }, []);

    return (
        <div className='portfolio-content'>
            <h1>My GitHub Portfolio</h1>
            {loading ? ( // Display loading message if loading is true
                <p>Loading projects...</p>
            ) : (
                <div className='repo-grid'>
                    {repos.map(repo => (
                        <a key={repo.id} href={repo.html_url} target='_blank' className='repo'>
                            <h2>{repo.name}</h2>
                            <p>{repo.description}</p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Portfolio;