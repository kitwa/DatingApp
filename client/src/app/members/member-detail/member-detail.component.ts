import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryImages: Photo[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  getImages(): Photo[]{
    const imageUrls: any = [];
    for(const photo of this.member.photos){
      imageUrls.push(photo.url);
    }

    return imageUrls;
  }

  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username') || '{}').subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }

}
