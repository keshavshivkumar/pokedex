import { Box } from "@mui/material"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box>
            <Box id="heading">
                <Box id="logo">
                    <Link to={'/'}>    
                        <img src='../pokemon_logo.png' />
                    </Link>
                </Box>
            </Box>
            <hr id="hr-line"/>
        </Box>
    )
}

export default Header;
