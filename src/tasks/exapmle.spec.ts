// an example file for testing : 
class FriendsList {
    friends = []; 

    addFreind(name){
        this.friends.push(name); 
        this.announcefriendship(name);
    }

    announcefriendship(name){
        global.console.log(`${name} is now a freind`); 
    }
    removeFreind(name){
        const idx = this.friends.indexOf(name); 

        if(idx === -1){
            throw Error('no such freind')
        }
        this.friends.splice(idx,1); 
    }
}

xdescribe('friendsList', ()=>{
    let friendsList; 

    beforeEach(()=>{
        friendsList = new FriendsList(); 
    })

    it ('initializes friends list', ()=>{
        expect(friendsList.friends.length).toEqual(0);
    })

    it('adds a friend to the list', ()=>{
        friendsList.addFreind('Asaf');
        expect(friendsList.friends.length).toEqual(1);
    })

    it('announces friendship', ()=>{
    // this is a mock function creation in jest. 
    friendsList.announcefriendship = jest.fn();
    friendsList.addFreind('Asaf');
    expect(friendsList.announcefriendship).toHaveBeenCalled();
    
    //same as :
    // expect(friendsList.announcefriendship).toHaveBeenCalledTimes(1);
    
    // more options: 
    // expect(friendsList.announcefriendship).not.toHaveBeenCalled();
    // expect(friendsList.announcefriendship).toHaveBeenCalledWith('Asaf')

    }); 

    describe('remove freind',()=>{

        it('removes a freind from the list', ()=>{
            friendsList.addFreind('Asaf'); 
            expect(friendsList.friends[0]).toEqual('Asaf');
            friendsList.removeFreind('Asaf');
            expect(friendsList.friends[0]).toBeUndefined();
 
        })

        it('throws an error as friend does not exist', ()=>{
            expect(()=> friendsList.removeFreind('Asaf')).toThrow();
            // more specific 
            expect(()=> friendsList.removeFreind('Asaf')).toThrowError();
            // more specific 
            expect(()=> friendsList.removeFreind('Asaf')).toThrowError(new Error('no such freind'));
        })

    })
})