export interface IActionGridProps {
    actions: Array<{
        id: string;
        label: string;
        icon: string;
        onPress: () => void;
    }>;
}
