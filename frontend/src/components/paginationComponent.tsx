import { BluePinkButton } from "../UI/styled/buttons";
import { PaginationContainer } from "../UI/styled/cards";

interface PaginationComponentProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}
const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, onPageChange }) => {
    return (
        <PaginationContainer>
            <BluePinkButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            > Prev </BluePinkButton>
            <span>{currentPage}</span>
            <BluePinkButton
                onClick={() => onPageChange(currentPage + 1)}
            > Next </BluePinkButton>
        </PaginationContainer>
    )
}

export default PaginationComponent