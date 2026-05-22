import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Supabase se 'projects' table ka saara data lana
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false }); // naye projects pehle dikhenge

      if (data) setProjects(data);
      if (error) console.error("Error fetching data:", error);
    };

    fetchProjects();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Portfolio</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {projects.map((proj) => (
          <div key={proj.id} style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px' }}>
            <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}