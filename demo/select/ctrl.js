function SelectCtrl($scope, $nguiSelect) {
    var $select = this.$select = $nguiSelect({
      srcUrl :'/api/notification/player',
      srcLabel:'Тоглогч',
      srcId:'id'
    });
}
