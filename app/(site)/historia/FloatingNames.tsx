import React from 'react';

interface NameProps {
    text: string;
    style: React.CSSProperties;
}

const FloatingNames: React.FC = () => {
    const names: NameProps[] = [
        { text: "Catherine<br/>Ruz", style: { top: '15%', left: '8%', transform: 'rotate(-15deg)', fontSize: '3rem' } },
        { text: "Pablo<br/>Riccheri", style: { top: '18%', right: '10%', transform: 'rotate(12deg)', fontSize: '2.4rem' } },
        { text: "Joaquín<br/>Nuñez", style: { bottom: '8%', left: '4%', transform: 'rotate(10deg)', fontSize: '2.5rem' } },
        { text: "Benjamín<br/>Inzunza", style: { bottom: '15%', right: '5%', transform: 'rotate(-10deg)', fontSize: '2rem' } },
        { text: "Anne<br/>Traub", style: { top: '58%', left: '2%', transform: 'rotate(-7deg)', fontSize: '2.2rem' } },
        { text: "Alessandra<br/>Mussuto", style: { top: '45%', right: '4%', transform: 'rotate(12deg)', fontSize: '2.2rem' } },
        { text: "Ignacio<br/>Morales", style: { bottom: '5%', left: '15%', transform: 'rotate(-5deg)', fontSize: '2.4rem' } },
        { text: "Clemente<br/>Pacheco", style: { top: '12%', left: '55%', transform: 'rotate(4deg)', fontSize: '2rem' } },
        { text: "Dante<br/>Espinoza", style: { bottom: '22%', left: '52%', transform: 'rotate(-5deg)', fontSize: '2rem' } },
        { text: "Teresa<br/>Bustamante", style: { bottom: '4%', right: '32%', transform: 'rotate(10deg)', fontSize: '2.5rem' } },
        { text: "Daniela<br/>Jadue", style: { top: '28%', right: '1.5%', transform: 'rotate(-8deg)', fontSize: '2.4rem' } },
        { text: "Carolina<br/>Vega", style: { bottom: '18%', right: '28%', transform: 'rotate(12deg)', fontSize: '2.3rem' } },
        { text: "Melissa<br/>Langenbach", style: { bottom: '22%', left: '4%', transform: 'rotate(8deg)', fontSize: '1.4rem' } },
        { text: "Ángelo<br/>Ugalde", style: { bottom: '22%', left: '18%', transform: 'rotate(-4deg)', fontSize: '1.4rem' } },
        { text: "Martina<br/>Ortega", style: { top: '22%', left: '42%', transform: 'rotate(-6deg)', fontSize: '1.4rem' } },
        { text: "Catalina<br/>Aránguiz", style: { bottom: '33%', right: '2%', transform: 'rotate(-15deg)', fontSize: '1.6rem' } },
        { text: "Gina<br/>Ocqueteau", style: { top: '22%', left: '-5%', transform: 'rotate(-10deg)', fontSize: '2.6rem' } },
        { text: "Fernanda<br/>Vicente", style: { top: '52%', left: '12%', transform: 'rotate(6deg)', fontSize: '1.8rem' } },
        { text: "Ricardo<br/>Gómez", style: { bottom: '3%', right: '12%', transform: 'rotate(-4deg)', fontSize: '1.4rem' } },
        { text: "Maglio<br/>Olguín", style: { bottom: '2%', right: '22%', transform: 'rotate(6deg)', fontSize: '1.4rem' } },
        { text: "Javiera<br/>Cotet", style: { bottom: '15%', left: '35%', transform: 'rotate(4deg)', fontSize: '1.5rem' } },
        { text: "Simon<br/>Boric", style: { bottom: '35%', right: '12%', transform: 'rotate(-15deg)', fontSize: '2.7rem' } },
        { text: "Marcelo<br/>Guital", style: { bottom: '48%', left: '4%', transform: 'rotate(10deg)', fontSize: '2.3rem' } },
        { text: "Franco<br/>Ivanovic", style: { bottom: '1%', left: '46%', transform: 'rotate(-4deg)', fontSize: '1.2rem' } },
        { text: "Benjamín<br/>Contreras", style: { bottom: '48%', left: '-5%', transform: 'rotate(5deg)', fontSize: '1.2rem' } }
    ];

    return (
        <>
            {names.map((name, index) => (
                <span 
                    key={index} 
                    className={`floating-name name-${index}`} 
                    style={name.style}
                    dangerouslySetInnerHTML={{ __html: name.text }}
                />
            ))}
        </>
    );
};

export default FloatingNames;
