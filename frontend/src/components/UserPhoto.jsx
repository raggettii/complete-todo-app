const UserPhoto = () =>{
    const username = localStorage.getItem('username') || 'Guest';
    const firstLetter = username.charAt(0).toUpperCase();
    return <>
    <div className="flex items-center justify-end">
      <div
        className="px-4 py-2 bg-green-100 text-black rounded-lg text-lg font-medium max-w-xs truncate"
        title={username}
      >
        {username}
      </div>
    </div>
    </>
}

export {UserPhoto};