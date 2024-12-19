const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    
    // Check if all required data is present in local storage
    if (user) {
      
      return true;
    }
    alert('You are not logged in!');
    return false;
  }
  
  export default isLoggedIn;
