import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/home.tsx';
import { Daily } from './pages/daily/daily.tsx';
import { MunicipalitiesProvider } from './providers/municipalities-provider.tsx';
import { Clock } from './pages/clock/clock.tsx';


export const App = () => {

    return (
        <>
            <MunicipalitiesProvider>
                <BrowserRouter basename={'/TERRAS-LUSAS'}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/daily" element={<Daily />} />
                        <Route path="/clock" element={<Clock />} />
                    </Routes>
                </BrowserRouter>
            </MunicipalitiesProvider>
        </>
    );
};

