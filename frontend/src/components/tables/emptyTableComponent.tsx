import { EmptyTableCover } from "../../UI/styled/cards"

interface EmptyTableComponentProps {
    name: string
}
const EmptyTableComponent: React.FC<EmptyTableComponentProps> = ({ name }) => {
    return (
        <EmptyTableCover>
            {name} table is empty
        </EmptyTableCover>
    )
}

export default EmptyTableComponent