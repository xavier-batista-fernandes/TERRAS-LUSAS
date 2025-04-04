import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMunicipalities } from '../utilities/fetchMunicipalities.ts';
import { toTitleCase } from '../utilities/toTitleCase.ts';

const MunicipalitiesContext = createContext<MunicipalitiesContextData | undefined>(undefined);

export interface MunicipalitiesContextData {
    isLoading: boolean;
    rawData?: any; // TODO: abstract raw data from the rest of the app
    districts: Set<string>;
    municipalities: Set<string>;
    municipalitiesPerDistrict: Map<string, Set<string>>;
}

export const useMunicipalities = () => {
    const context = useContext(MunicipalitiesContext);
    if (!context) throw new Error('useMunicipalities must be used within a MunicipalitiesProvider');
    return context;
};

export const MunicipalitiesProvider = ({ children }: { children: ReactNode }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [rawData, setRawData] = useState<{ type: string, features: any } | undefined>(undefined);

    const [districts, setDistricts] = useState(new Set<string>());
    const [municipalities, setMunicipalities] = useState(new Set<string>());
    const [municipalitiesPerDistrict, setMunicipalitiesPerDistrict] = useState(new Map<string, Set<string>>());

    const data: MunicipalitiesContextData = {
        isLoading,
        rawData,
        districts,
        municipalities,
        municipalitiesPerDistrict,
    };

    useEffect(() => {

        const init = async () => {

            // Fetch the raw data
            const rawData = await fetchMunicipalities();
            setRawData(rawData);

            // Extract districts from the raw data
            const newMunicipalitiesPerDistrict = new Map<string, Set<string>>();

            rawData.features.forEach(
                (feature: any) => {
                    const district = toTitleCase(feature.properties['District']);
                    const municipality = toTitleCase(feature.properties['Municipality']);

                    // Create a set for the district if it doesn't exist
                    if (!newMunicipalitiesPerDistrict.get(district)) {
                        newMunicipalitiesPerDistrict.set(district, new Set<string>());
                    }

                    // Add municipality to the district set
                    newMunicipalitiesPerDistrict.get(district)!.add(municipality);
                },
            );

            // 1. Create districts set
            setDistricts(new Set((newMunicipalitiesPerDistrict.keys())));

            // 2. Create municipalities set
            setMunicipalities(new Set(Array.from(newMunicipalitiesPerDistrict.values()).flatMap((municipalitySet) => Array.from(municipalitySet))));

            // 3. Save new municipalities per district set
            setMunicipalitiesPerDistrict(new Map(newMunicipalitiesPerDistrict));


            setIsLoading(false);

            // TODO: handle errors and allow for page reloads
        };

        init();

        return () => {
            // TODO: learn how to clean up providers
        };
    }, []);

    return (
        <MunicipalitiesContext.Provider value={data}>
            {children}
        </MunicipalitiesContext.Provider>
    );
};
