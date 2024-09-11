export function GradientName({username}:{username:string}) {
  return(
    <div className="video-wrapper overflow-hidden w-[6em] lg:w-[320px] relative ml-2">
      <video loop autoPlay muted className="">
        <source src={'/textback_1.mp4'} type="video/mp4" />
      </video>
      <p className="font-extrabold w-full bg-black overflow-hidden mix-blend-multiply absolute top-0 left-0  bottom-0 text-white">
        {username}
      </p>
    </div>
  )
}
// export function MobileGradientName({username}:{username:string}) {
//   return(
//     <div className="video-wrapper overflow-hidden w-[6em] lg:w-[320px] relative ml-2">
//       <video loop autoPlay muted className="">
//         <source src={'/textback_1.mp4'} type="video/mp4" />
//       </video>
//       <p className="font-extrabold w-full bg-black overflow-hidden mix-blend-multiply absolute top-0 left-0  bottom-0 text-white">
//         {username}
//       </p>
//     </div>
//   )
// }
