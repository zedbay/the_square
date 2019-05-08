import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../shared/services/network.service';
import { FriendService } from '../../shared/services/friend.service';
import { IconDefinition, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-actualite',
	templateUrl: './actualite.component.html',
	styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {

	public faThumbsUp: IconDefinition = faThumbsUp;
	public faThumbsDown: IconDefinition = faThumbsDown;
	private contents = [];
	private authors = [];
	public posts = [];

	constructor(private networkService: NetworkService, private friendService: FriendService) { }

	ngOnInit() {
		this.loadPost();
	}

	private loadPost() {
		this.networkService.get('post').subscribe(res => {
			this.contents = res['posts'];
			this.authors = res['authors'];
			for (let i = 0; i < this.contents.length; i++) {
				this.posts.push({ content: this.contents[i], author: this.authors[i] });
			}
			console.log(this.posts);
		});
	}

	public onReactPost(post: any, reaction: string) {
		const body = {
			reaction: reaction,
			idPost: post.content.identity.low
		};
		this.networkService.post('post/react', body).subscribe(res => { });
	}

	public onVisitProfil(person: any) {
		this.friendService.onVisitProfil(person);
	}

}
