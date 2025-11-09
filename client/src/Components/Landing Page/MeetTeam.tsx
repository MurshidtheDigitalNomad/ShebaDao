const MeetTheTeam = () => {
    const teamMembers = [
      { name: "Julkifl Hasan Wasi", role: "ML/DL Specialist", image: "/wasi.png" },
      { name: "Subah Hasan", role: "Full Stack Developer", image: "/subah.png" },
      { name: "Murshidul Haque Ahmed", role: "AI Engineer", image: "/Mypic.jpg" },
      { name: "Zarif Riza", role: "Software Architect", image: "/riza.png" }
    ];
  
    return (
      <>
        <style>{`
          .team-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .team-title {
            font-size: 3rem;
          }
          @media (min-width: 768px) {
            .team-grid {
              grid-template-columns: repeat(4, 1fr);
            }
            .team-title {
              font-size: 4rem;
            }
          }
          @media (min-width: 640px) and (max-width: 767px) {
            .team-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}</style>
        
        <section style={{ padding: '2rem 0', backgroundColor: '#F1FAFB' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 0.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="team-title" style={{ 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif'
              }}>
                Meet Team Bhodroloks!
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#4B5563', maxWidth: '56rem', margin: '0 auto', lineHeight: 1.8 }}>
                We are a team of four passionate CSE students from BRAC University, each complementing the others with expertise in different fields. Our team consists of innovators experienced in training ML and DL models as well as developing software and web applications. We are determined to bring a change in the transformation of Bangladesh by harnessing the power of AI—the most impactful tool today.
              </p>
            </div>
  
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '1rem', 
                  padding: '1.5rem', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #F3F4F6',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 30px -5px rgba(93, 47, 119, 0.3)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '250px', 
                    background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)', 
                    borderRadius: '0.75rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}>
                    <img src={member.image} alt="MyPic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827', fontFamily: 'Teko, sans-serif' }}>
                    {member.name}
                  </h3>
                  <p style={{ color: '#5D2F77', fontWeight: '500' }}>
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

export default MeetTheTeam;
