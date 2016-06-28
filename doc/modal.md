#Modal
  factory that show and closes modal dialog. If you need to pass variables to the view from the controller, you have to assign to params`s key.

### showDialog(__config__) 
  config: that needed to initialize modal
    __view__ (_required_) - template path. You have to write modal template that is already takes class that neede to display it in the file.
      For example: bootstrap should contain class "in".
    __scope__ (_optional_) - You can assign scope in where modal included. _Default_: $rootScope
    __params__ (_optional_) - object that needs to pass to the view

    __Note__: You have to handle size and other style related stuffs in the template.

  in the view
    $modal.close() -- destroys scope and content of modal
    $params -- gets parameters that passed from controller
