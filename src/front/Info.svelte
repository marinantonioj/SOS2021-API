<script>
    import {
    Button, Container, Jumbotron,
    
  } from "sveltestrap";
  </script>
  
  <main>
      
      <h1>SOS2021-02</h1>
    <Jumbotron>
        <p>API DATOS FRUTOS SECOS</p>
        <a href="#/nuts-production-stats"
                ><Button color="primary">Datos frutos secos</Button></a
              >
        <a href="https://sos2021-02.herokuapp.com/api/v2/nuts-production-stats"
              ><Button color="primary">URL base (Backend)</Button></a
            >
        <a href="https://documenter.getpostman.com/view/10637366/TzJoDfrf"
                ><Button color="primary">Documentación de Postman v1</Button></a
              >
        <a href="https://documenter.getpostman.com/view/10637366/TzRNE9Zz"
              ><Button color="primary">Documentación de Postman v2</Button></a
              >
        <a href="#/nuts-graph"
              ><Button color="warning">Gráfica</Button></a
              >
        <ul>
            <p1>Antonio José Marín Rodríguez.</p1>
        </ul>
    </Jumbotron>

            <a href="https://github.com/gti-sos/SOS2021-02"> Repositorio del grupo 02</a>
      
   </main>

   <style>
       p {
            color: rgb(0, 0, 0);
            width: 300px;
            border: 1px solid black;
            
            margin-bottom: 25px;
            margin-left: 43%;
            text-align: center;
          }
      ul {
          margin-top: 25px;
      }
   </style>