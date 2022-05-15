// import { API_BASE_URL } from "../../constants/apiConstants";
// import CommunityPage from './CommunityPage'
// import ResourcePage from './ResourcePage'
// import Modal from '../components/Modal'
// import { Link, useParams } from 'react-router-dom'
// import { useEffect } from 'react'

// const GriefStagePage = ({
//   griefStage,
//   setGriefStage,
//   communities,
//   setCommunities,
//   unicornUser,
//   setUnicornUser,
//   openModal,
//   setOpenModal,
//   header,
//   setHeader,
//   errorMessage,
//   setErrorMessage,
//   resources,
//   setResources
// }) => {
//   const { griefStageId } = useParams()

//   const getGriefStage = async () => {
//     const res = await Client.get(`/detail/grief-stage/${griefStageId}`)
//     console.log(res.data)
//     setGriefStage(res.data)
//   }

//   useEffect(() => {
//     getGriefStage()
//   }, [])

//   return (
//     <div className="grief-stage-page">
//       <div className="grief-stage-container">
//         <h1 className="grief-stage-name">{griefStage.title}</h1>
//         <img
//           className="grief-stage-image"
//           src={griefStage.image}
//           alt={griefStage.title}
//         />
//         <div className="grief-stage-desc-header">
//           <h3 className="grief-stage-header">
//             What is {griefStage.title} and how do i know that I am here?
//           </h3>
//           <div className="grief-stage-desc">
//             <p>{griefStage.description}</p>
//           </div>
//         </div>
//         <div className="resources-carousel">
//           {resources.map((resource) => (
//             <Link to="/resources">
//               <ResourcePage
//                 key={resource.id}
//                 title={resource.resource_title}
//                 resource={resource.resource}
//                 griefStage={resource.grief_stage}
//                 image={resource.image}
//                 unicornUser={unicornUser}
//                 setUnicornUser={setUnicornUser}
//                 openModal={openModal}
//                 setOpenModal={setOpenModal}
//                 errorMessage={errorMessage}
//                 setErrorMessage={setErrorMessage}
//                 header={header}
//                 setHeader={setHeader}
//               />
//               View Resources
//             </Link>
//           ))}
//         </div>
//         <div className="grief-stage-community">
//           <h2 className="community-title">Explore Communities</h2>
//           <Link to="communities">
//             <CommunityPage
//               communities={communities}
//               setCommunities={setCommunities}
//               griefStage={griefStage}
//               setGriefStage={setGriefStage}
//               griefStageId={griefStageId}
//               unicornUser={unicornUser}
//               setUnicornUser={setUnicornUser}
//               openModal={openModal}
//               setOpenModal={setOpenModal}
//               header={header}
//               setHeader={setHeader}
//               errorMessage={errorMessage}
//               setErrorMessage={setErrorMessage}
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GriefStagePage
