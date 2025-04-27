<script>
    export let title = "My Website"; // You can pass a title to the component if needed
  </script>
  
  <header>
    <nav>
      <div class="logo">
        <a href="/">
          <h1>{title}</h1>
        </a>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <style>
    header {
      background-color: #333;
      color: white;
      padding: 1rem;
    }
  
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .logo h1 {
      margin: 0;
    }
  
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    li {
      margin-left: 1rem;
    }
  
    a {
      color: white;
      text-decoration: none;
    }
  
    a:hover {
      text-decoration: underline;
    }
  </style>
  