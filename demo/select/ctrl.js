function SelectCtrl($scope, $nguiSelect) {
    var $select = this.$select = $nguiSelect({
      srcUrl :'/api/notification/player',
      tableLabel:'Тоглогч',
      srcId:'id',
      srcName: 'name'
    });
}
