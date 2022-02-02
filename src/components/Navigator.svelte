<script>
    import Title from "./Title.svelte";
  </script>
  
  <div class="uk-flex uk-flex-center uk-flex-middle uk-text-center uk-grid-small" uk-grid>
    <Title title="Pois" subTitle="Select Pois or Users" />
    <div>
      <ul class="uk-iconnav uk-margin-left uk-margin-right">
        <a href="/#/users" class="uk-card uk-card-small uk-card-hover uk-padding-small">
          <i class="fas fa-hand-holding-usd fa-3x" style="color:rgb(153, 196, 74)" title="Pois" uk-tooltip></i>
        </a>
        <a href="/#/pois" class="uk-card uk-card-small uk-card-hover uk-padding-small">
          <i class="fas fa-clipboard-list fa-3x" style="color:rgb(63, 122, 139)" title="Users" uk-tooltip></i>
        </a>
      </ul>
    </div>
  </div>