function search() {
    let locationQuery = $("#location-box").val();
    location.href = "../search.html?location=" + locationQuery;
}