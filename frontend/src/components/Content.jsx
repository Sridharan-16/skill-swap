import {Link} from 'react-router-dom'
export default function Content(){
    return(
        <div style={
            {"display":'flex',
            'justifyContent':'center',
            'alignItems':'center',
            'margin' : '50px'
            }
        }>
            <div className="content">
                <Link to='/login'>GET START</Link>
            </div>
        </div>
    )
}