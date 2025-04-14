import { Container } from '../../atoms/container/container.tsx';
import { Text } from '../../atoms/text/text.tsx';

export function Loading() {
    return <Container
        height="100vh"
        width="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
    >
        <Text fontSize="2.5rem" fontWeight="bold">⏳ A carregar...</Text>
    </Container>;
}
