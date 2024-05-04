interface PaginationComponentProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    limit: number;
    amount: number;
}
const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, onPageChange, limit, amount }) => {
    return (
        <div>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            > Prev </button>
            <span>{currentPage}</span>
            <button
                disabled={amount < limit}
                onClick={() => onPageChange(currentPage + 1)}
            > Next </button>
        </div>
    )
}

export default PaginationComponent