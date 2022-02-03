<script>
    import PoiList from "/src/components/PoiList.svelte";
    import tricolor from "/src/assets/ireland-flag.jpg";
    import { navBar, mainBar, subTitle, title } from "../stores";

    title.set("POI Tracker Inc.");
    subTitle.set("Latest POIs");
    navBar.set({
        bar: mainBar,
    });
</script>

<div class="uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
        <img width="300" src={tricolor} alt="homer" />
    </div>
    <div class="uk-width-1-2@m">
        <div
            class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge "
        >
            <PoiList />
        </div>
    </div>
    <div class="uk-width-1-2@m">
        <img width="300" src={tricolor} alt="homer" />
    </div>
</div>
