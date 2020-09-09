import React from 'react';

const Pictureloader = React.memo(props => {
    const {data} = props
    return <div style={{display: 'none'}}>
        {data.data.map(riding=>{
            return riding.results.map(candidate=>{
                return <img  alt="Candidate Headshot" onError={(e) => { e.target.onError = null; e.target.src =`/img/images.jpg`}} src={`/image/${candidate.cachedHeadFilename}`}/>
            })
        })}
    </div>
})

export default Pictureloader
