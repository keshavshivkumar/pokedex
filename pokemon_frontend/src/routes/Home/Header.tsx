import { Box } from "@mui/material"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box id="heading">
            <Box id="logo">
                <Link to={'/'}>    
                    <img src='../pokemon_logo.png' />
                </Link>
            </Box>
        </Box>
    )
}

export default Header;
