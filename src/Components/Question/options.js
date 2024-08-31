function options({options,index}) {
    const optiontype= String.fromCharCode(64+index);
    return (
        <div div class="flex space-x-4">
            <p>optiontype</p>
            <p ml-4px>option</p>
        </div>
    )
}

export default options
