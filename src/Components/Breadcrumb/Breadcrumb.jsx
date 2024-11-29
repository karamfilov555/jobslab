import React from 'react'

const Breadcrumb = ({topic,topicSpan}) => {
  return (
    <section className="breadcrumb-height bg-default jm-breadcrumb-area align-items-center d-flex pt-100">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="jm-breadcrumb-wrap pt-105 pb-115">
                            <a href="jobslab-index.html">Home</a>
                            <span>{topicSpan}</span>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}

export default Breadcrumb