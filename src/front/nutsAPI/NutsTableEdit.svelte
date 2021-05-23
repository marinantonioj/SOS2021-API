<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    export let params = {};
    const BASE_NUTS_API_PATH = "/api/v2/";
    let data = {};
    let updateCountry = "XXXX";
    let updateYear = 9999;
    let updateAlmond = 9999;
    let updateWalnut = 9999;
    let updatePistachio = 9999;
    let errorMsg = "";
    let okMsg = "";

    onMount(getData);

    async function getData(){
        console.log("Fetching nutsstats..." + params.country + " " + params.year + " Link que llega: " + BASE_NUTS_API_PATH+"nuts-production-stats/" + params.country + "/" + params.year);
        const res = await fetch(BASE_NUTS_API_PATH+"nuts-production-stats/" + params.country + "/" + params.year);

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            updateCountry = data.country;
            updateYear = data.year;
            updateAlmond= data["almond"];
            updateWalnut= data["walnut"];
            updatePistachio= data["pistachio"];
            console.log(`Los datos actualizados son: ${updateCountry} ${updateYear} ${updateAlmond} ${updateWalnut} ${updatePistachio}`);
            


            console.log(`We have received ${data.length} countries.`);
        }else{
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }   
    

    async function updateData() {

        console.log("Updating country..." + JSON.stringify(params.country)+JSON.stringify(params.year));

        const res = await fetch("/api/v2/nuts-production-stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "almond": parseInt(updateAlmond),
                "walnut": parseInt(updateWalnut),
                "pistachio": parseInt(updatePistachio),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getData();
          errorMsg = "";
          okMsg = "Dato actualizado";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          getData();
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    
    onMount(getData);

</script>

<main>
    <h1>
        Editar <strong>{params.country}</strong>
    </h1>

    <div>
        {#if errorMsg}
        <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
        {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
    </div>

    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Almendra</th>
                <th>Nuez</th>
                <th>Pistacho</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateCountry}</td>
                <td>{updateYear}</td>
                <td><input bind:value="{updateAlmond}"></td>
                <td><input bind:value="{updateWalnut}"></td>
                <td><input bind:value="{updatePistachio}"></td>
            </tr>
        </tbody>
    </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Retroceder</Button>
</main>

<style>
    p {
    display: inline;
  }

  .msgRed {
    padding: 4px;
    background-color: #f8d7da;
  }

  .msgGreen {
    padding: 4px;
    background-color: #d4edda;
  }

  div{
    margin-bottom: 15px;
  }
</style>