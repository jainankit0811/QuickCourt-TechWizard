

const palette = {
    dark: '#212121',
    midDark: '#424242',
    mid: '#616161',
    midLight: '#757575',
    light: '#9E9E9E',
};

const circuitBg = `
	linear-gradient(135deg, rgba(33,33,33,0.95) 0%, rgba(66,66,66,0.95) 100%),
	url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80')
`;

const LandingPage = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: circuitBg,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    background: 'rgba(33,33,33,0.7)',
                    maxWidth: '90vw',
                }}
            >
                <h1
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        color: palette.light,
                        fontWeight: 900,
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                        textShadow: 'none',
                    }}
                >
                    QuickCourt
                </h1>
                <h2
                    style={{
                        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                        color: palette.midLight,
                        fontWeight: 500,
                        marginBottom: '2rem',
                    }}
                >
                    Court Booking Platform
                </h2>
                <button
                    style={{
                        padding: '0.75rem 2.5rem',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: palette.dark,
                        background: palette.light,
                        border: 'none',
                        borderRadius: '2rem',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = palette.midLight)}
                    onMouseOut={e => (e.currentTarget.style.background = palette.light)}
                >
                    Get Started
                </button>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    h1 {
                        font-size: 2.2rem !important;
                    }
                    h2 {
                        font-size: 1.1rem !important;
                    }
                    button {
                        font-size: 1rem !important;
                        padding: 0.6rem 1.5rem !important;
                    }
                }
                @media (min-width: 601px) and (max-width: 900px) {
                    h1 {
                        font-size: 3.5rem !important;
                    }
                    h2 {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
