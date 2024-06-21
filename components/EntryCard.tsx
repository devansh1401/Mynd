// const EntryCard = ({ entry }) => {
//   console.log(' frw fre', entry)
//   // Extract mood and summary from the analysis property
//   const mood = entry.analysis?.mood || 'Mood not available'
//   const summary = entry.analysis?.summary || 'Summary not available'
//   const date = new Date(entry.createdAt).toDateString()
//   return (
//     <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
//       <div className="px-4 py-5 sm:px-6">{date}</div>
//       <div className="px-4 py-5 sm:p-6">summary : {summary}</div>
//       <div className="px-4 py-4 sm:px-6">Mood : {mood}</div>
//     </div>
//   )
// }

// export default EntryCard
const EntryCard = ({ entry }) => {
  const mood = entry.analysis?.mood || 'Mood not available'
  const summary = entry.analysis?.summary || 'Summary not available'
  const date = new Date(entry.createdAt).toDateString()
  const color = entry.analysis?.color || '#000000' // Default to black if no color is provided

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6 font-semibold text-gray-700">
        {date}
      </div>
      <div className="px-4 py-5 sm:p-6 text-lg text-gray-600">
        <span className="font-medium">Summary:</span> {summary}
      </div>
      <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase tracking-wider`}
          style={{ backgroundColor: color, color: getColorContrast(color) }}
        >
          {mood}
        </span>
      </div>
    </div>
  )
}

// Function to determine text color based on background color for contrast
function getColorContrast(bgColor) {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1) : bgColor
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

export default EntryCard
