interface EmptyTableComponentProps {
    name: string
}
const EmptyTableComponent: React.FC<EmptyTableComponentProps> = ({ name }) => {
    return (
        <div>
            {name} table is empty
        </div>
    )
}

export default EmptyTableComponent