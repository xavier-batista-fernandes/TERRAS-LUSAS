import './marathon-statistics.css';
import { useStatistics } from '../../../hooks/useStatistics.ts';
import { getMarathonHistory } from '../../../utils/get-marathon-history.ts';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../../../../core/components/atoms/buttons/secondary-button/secondary-button.tsx';


export function MarathonStatistics() {
    const navigate = useNavigate();
    const {
        getNumberMarathonsPlayed,
        getNumberUnknownMunicipalities,
        getNumberCompleteDistricts,
        getAverageScore,
        getAverageDuration,
        getBestScore,
        getBestMunicipality,
        getBestMunicipalityPercentage,
        getQuitsPercentage,
    } = useStatistics();

    const marathonsPlayed = getNumberMarathonsPlayed();
    const bestScore = getBestScore();
    const averageScore = getAverageScore();
    const unknownMunicipalities = getNumberUnknownMunicipalities();
    const completeDistricts = getNumberCompleteDistricts();
    const bestMunicipality = getBestMunicipality();
    const averageDuration = getAverageDuration();
    const bestMunicipalityParticipation = getBestMunicipalityPercentage();
    const quitsPercentage = getQuitsPercentage();

    const getAverageDurationText = () => {
        if (marathonsPlayed <= 0) return 'Ainda não descobriste nenhum município.';

        let minutesPart = undefined;
        let secondsPart = undefined;

        if (averageDuration.minutes! > 0) {
            minutesPart = ` ${averageDuration.minutes} minuto${averageDuration.minutes! > 1 ? 's' : ''}`;
        }

        if (averageDuration.seconds! > 0) {
            secondsPart = ` ${averageDuration.seconds} segundo${averageDuration.seconds! > 1 ? 's' : ''}`;
        }
        return 'As tuas maratonas duraram em média' +
            `${minutesPart ?? ''}` +
            `${minutesPart && secondsPart ? ' e' : ''}` +
            `${secondsPart ?? ''}.`;
    };

    const stats = [
        {
            svgSrc: '/assets/icons/dice-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de um dado',
            title: 'Maratonas',
            description: () =>
                marathonsPlayed > 0
                    ? `Participaste em ${marathonsPlayed} maratona${marathonsPlayed > 1 ? 's' : ''}.`
                    : 'Ainda não descobriste nenhum município.',
        },
        {
            svgSrc: '/assets/icons/rocket-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de um foguete',
            title: 'Recorde',
            description: () =>
                bestScore > 0
                    ? `A tua melhor pontuação foi de ${bestScore} municípios certos.`
                    : 'Ainda não descobriste nenhum município.',
        },
        {
            svgSrc: '/assets/icons/map-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de um gráfico de barras',
            title: 'Municípios',
            description: () =>
                averageScore > 0
                    ? `Acertaste em média ${averageScore.toFixed(2)} municípios por maratona.`
                    : 'Ainda não descobriste nenhum município.',
        },
        {
            svgSrc: '/assets/icons/telescope-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de um telescópio',
            title: 'Por descobrir',
            description: () =>
                unknownMunicipalities > 0
                    ? `Ainda tens ${unknownMunicipalities} municípios por desvendar.`
                    : `Já exploraste todos os município${unknownMunicipalities > 1 ? 's' : ''}!`,
        },
        {
            svgSrc: '/assets/icons/earth-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de um globo terrestre',
            title: 'Distritos',
            description: () =>
                completeDistricts > 0
                    ? `Já completaste ${completeDistricts} distrito${completeDistricts > 1 ? 's' : ''}.`
                    : 'Ainda não completaste nenhum distrito.',
        },
        {
            svgSrc: '/assets/icons/sparkles-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de brilhos',
            title: 'Favoritos',
            description: () =>
                marathonsPlayed > 0 && bestMunicipality
                    ? `Escreveste ${bestMunicipality} nas maratonas ${bestMunicipalityParticipation?.toFixed(2)}% das vezes.`
                    : 'Ainda não descobriste nenhum município.',
        },
        {
            svgSrc: '/assets/icons/hand-right-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de uma mão direita com a palma virada para o utilizador',
            title: 'Desistências',
            description: () =>
                marathonsPlayed > 0
                    ? `Desististe antes do tempo terminar ${quitsPercentage.toFixed(2)}% das vezes.`
                    : 'Ainda não descobriste nenhum município.',
        },
        {
            svgSrc: '/assets/icons/timer-sharp-svgrepo-com.svg',
            svgAlt: 'Uma imagem de um cronómetro',
            title: 'Duração',
            description: () => getAverageDurationText(),
        },
    ];


    const isEmpty = getMarathonHistory().length === 0;

    return (
        <div className="marathon-statistics">
            <div className="header">
                <img src="/assets/icons/bar-chart-sharp-svgrepo-com.svg"
                     alt="Uma imagem de um gráfico de barras." />
                <div className="title">
                    <h1>Estatísticas da Maratona</h1>
                    <p>Acompanha o teu progresso e troféus das várias maratonas.</p>
                </div>
            </div>

            {isEmpty &&
                <div className="empty-content">
                    <img src="/assets/icons/search-sharp-svgrepo-com.svg"
                         alt="Uma lupa inclinada para a esquerda." />
                    <div className="title">
                        <h2>Ainda não existem dados</h2>
                        <p>Joga pelo menos uma vez para veres estatísticas.</p>
                    </div>
                </div>
            }

            {!isEmpty &&
                <div className="not-empty-content">
                    {stats.map((stat, index) => (
                        <div key={index} className="card">
                            <div className="title">
                                <img src={stat.svgSrc} alt={stat.svgAlt} />
                                <h2>{stat.title}</h2>
                            </div>
                            <p>{stat.description()}</p>
                        </div>
                    ))}
                </div>
            }

            <div className="actions">
                <SecondaryButton onClick={() => navigate('/marathon')}>
                    Voltar
                </SecondaryButton>
            </div>
        </div>
    );
}
